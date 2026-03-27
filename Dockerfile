# Use a base Node.js 24 Alpine image
FROM node:24-alpine

# Set environment variables
ENV HOME=/home/dev
ENV USER=dev

# Install minimal essential packages
RUN apk update && apk add --no-cache \
    git \
    && rm -rf /var/cache/apk/*  # Clean up to reduce image size

# Create a non-root user and set home directory 
RUN adduser -D -g '' $USER && \
    mkdir -p $HOME && \
    chown -R $USER:$USER $HOME

# Set the working directory to the home of the 'dev' user
WORKDIR $HOME

# Switch to the non-root user
USER $USER

# Configure npm to use a user-local prefix so global installs don't require root
RUN mkdir -p $HOME/.npm-global && npm config set prefix "$HOME/.npm-global"

# Install development tools like TypeScript, ESLint globally
RUN npm install -g typescript eslint

# Set a minimal, non-interactive shell environment
RUN echo "export PS1='[\u@\h \W]\$ '" >> $HOME/.ashrc \
    && echo "export PATH=$HOME/.npm-global/bin:$PATH" >> $HOME/.ashrc