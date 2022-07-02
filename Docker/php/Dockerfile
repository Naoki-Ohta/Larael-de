FROM php:8.1-apache
 
ENV APACHE_DOCUMENT_ROOT /var/www/html/study/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
&& sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
&& a2enmod rewrite
 
RUN apt-get update && apt-get install -y \
    libicu-dev \
    zip \
    unzip \
&& docker-php-ext-install -j$(nproc) intl \
&& docker-php-ext-install -j$(nproc) pdo_mysql
 
RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
 
COPY . /var/www/html
 
ENV COMPOSER_ALLOW_SUPERUSER 1
 
COPY --from=composer /usr/bin/composer /usr/bin/composer