FROM repository.kuknos.org:3051/kuknos/nginx-logger:v101

RUN rm -rf /usr/share/nginx

COPY build /var/www/site-data

COPY nginx.conf /etc/nginx