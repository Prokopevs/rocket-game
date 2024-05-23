build_docker:
	docker build -t game/frontend:latest -f docker/Dockerfile ./

start_docker:
	docker run --restart unless-stopped -p 8070:80 game/frontend:latest
