FROM nginx
ADD wwwroot/ /usr/share/nginx/html/
ADD css/ /usr/share/nginx/html/css/
ADD bootstrap/ /usr/share/nginx/html/bootstrap/