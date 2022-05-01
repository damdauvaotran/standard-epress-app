prepare:
	docker volume create mysql-volume
	docker volume create redis-volume
mysql:
	docker run -d -v mysql-volume -e MYSQL_ROOT_PASSWORD=12345678 --name mysql -p 3306:3306 mysql
redis:
	docker run -d -v redis-volume -p 6379:6379 --name redis redis
start-mysql:
	docker start mysql
start-redis:
	docker start redis