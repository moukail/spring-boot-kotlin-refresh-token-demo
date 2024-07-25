FROM node:22.3-alpine3.20
RUN apk --update --no-cache add bash rsync
#RUN echo | npm install -g npm

WORKDIR /var/www

ADD docker-init.sh /home/
RUN chmod +x /home/docker-init.sh
CMD bash /home/docker-init.sh