# FROM harbor.evescn.com/public/nginx:1.21.4

# WORKDIR /usr/share/nginx/html
# RUN rm -rf * && rm -rf /etc/nginx/conf.d/
# ADD ./dist /usr/share/nginx/html
# COPY ./deploy/nginx.conf /etc/nginx/nginx.conf
# COPY ./deploy/init.sh /etc/nginx/init.sh
# EXPOSE 80
# ENTRYPOINT ["/bin/sh","/etc/nginx/init.sh"]

FROM hub.c.163.com/library/nginx:latest

COPY dist/ /usr/share/nginx/html/

# RUN ln -s /usr/share/nginx/html/kenizi /usr/share/nginx/html
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf
