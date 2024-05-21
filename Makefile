build_docker:
	docker build -t game/frontend:latest -f docker/Dockerfile ./

start_docker:
	docker run --rm -d -p 8070:80 game/frontend:latest
