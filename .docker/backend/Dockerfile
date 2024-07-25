FROM amazoncorretto:17-alpine3.19

RUN apk --update --no-cache add bash wget rsync inotify-tools

RUN wget https://github.com/spring-projects/spring-cli/releases/download/v0.8.1/spring-cli-0.8.1.jar -O $HOME/spring.jar && chmod a+x $HOME/spring.jar
RUN echo -e '#!/usr/bin/env bash\njava -jar $HOME/spring.jar "$@"' > /usr/bin/spring && chmod +x /usr/bin/spring

WORKDIR /var/www

#ADD install.sh /home/
#RUN chmod +x /home/install.sh

ADD docker-init.sh /home/
RUN chmod +x /home/docker-init.sh
CMD bash /home/docker-init.sh