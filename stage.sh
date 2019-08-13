#!/usr/bin/bash
# backend deployment
echo "Deploy API Changes? (y/n)"
read api
echo "Deploy App Changes? (y/n)"
read app
if [ "$api" = "y" ] ; then
    echo "Compiling TypeScript to JavaScript..."
    tsc -p ./backend/
    echo "Copying files to server..."
    ssh killer-whale 'rm -r /var/www/blog_staging/api/build'
    rsync -r ./backend/build killer-whale:/var/www/blog_staging/api
    rsync ./backend/package.json killer-whale:/var/www/blog_staging/api/
    echo "Installing dependencies..."
    ssh killer-whale 'cd /var/www/blog_staging/api && yarn && yarn add pg'
    echo "Please restart the backend service on the server manually."
fi
# frontend deployment
if [ "$app" = "y" ] ; then
    echo "Beginning Frontend deployment."
    echo "Please set the config to the proper blog endpoint before continuing (api.test.blog.paulgellai.dev)."
    read -p "Press enter to continue. "
    cd frontend
    yarn build --prod
    cd ..
    echo "Copying files to server..."
    ssh killer-whale 'rm -r /var/www/blog_staging/app/'
    rsync -r ./frontend/dist/ killer-whale:/var/www/blog_staging/app/
fi
echo "Script complete."