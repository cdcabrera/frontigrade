FROM centos:7

RUN printf "[nginx]\nname=nginx repo\nbaseurl=http://nginx.org/packages/centos/7/x86_64/\ngpgcheck=0\nenabled=1" > /etc/yum.repos.d/nginx.repo && \
    curl --silent --location https://rpm.nodesource.com/setup_10.x | bash - && \
    curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo && \
    yum install git-core nginx nodejs yarn -y && \
    yum clean all && \
    sed -i 's/listen[[:space:]]*80;/listen 8080;/' /etc/nginx/conf.d/default.conf

RUN chmod 777 /var/log/nginx && chmod 777 /var/cache/nginx && chmod 777 /var/run && rm -rf /var/log/nginx/* && rm -rf /var/cache/nginx/*

WORKDIR /opt/frontigrade
ADD . /opt/frontigrade
ADD deployment/nginx.conf /etc/nginx/nginx.conf

ARG CI
ARG CI_COMMIT_REF_NAME
ARG CI_COMMIT_SHA
RUN if [ "$CI" ]; then echo UI_VERSION=${CI_COMMIT_REF_NAME} - ${CI_COMMIT_SHA} > ./.env.production.local; else echo UI_VERSION='local build' > ./.env.production.local; fi;

RUN yarn --production --non-interactive \
    && yarn build

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
