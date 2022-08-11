FROM node:16

# Create app directory
ENV HOME /usr/src/app
WORKDIR $HOME

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json yarn.lock $HOME/

RUN cd $HOME \
    && yarn install --pure-lockfile

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "app.js" ]
