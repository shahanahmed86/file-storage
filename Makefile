HOST=localhost

# development
run-dev-up:
	docker compose \
	-f docker-compose.yml -f docker-compose.dev.yml \
	up -d
run-dev-rebuild:
	docker compose \
	-f docker-compose.yml -f docker-compose.dev.yml \
	up -d --build server --renew-anon-volumes --no-deps && \
	make run-dev-up
run-dev-down:
	docker compose \
	-f docker-compose.yml -f docker-compose.dev.yml \
	down
run-dev-down-hard:
	docker compose \
	-f docker-compose.yml -f docker-compose.dev.yml \
	down -v

# test
run-test-up:
	docker compose \
	-f docker-compose.yml -f docker-compose.test.yml \
	up --abort-on-container-exit --renew-anon-volumes --build
run-test-down:
	docker compose \
	-f docker-compose.yml -f docker-compose.test.yml \
	down -v
