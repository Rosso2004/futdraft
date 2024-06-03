FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copi>
# where available (npm@5+)
COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile
#RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "npm", "start" ]