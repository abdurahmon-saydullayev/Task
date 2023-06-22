CURRENT_DIR=$(shell pwd)
TAG=latest
ENV_TAG=latest

pull-proto-module:
	git submodule update --init --recursive

update-proto-module:
	git submodule update --remote --merge

copy-proto-module: # for node.js services
	rm -rf ${CURRENT_DIR}/protos
	rsync -rv --exclude=.git ${CURRENT_DIR}/task_proto/* ${CURRENT_DIR}/protos

build-image:
	docker build --rm -t ${REGISTRY}/${PROJECT_NAME}/${SERVICE_NAME}:${TAG} .
	docker tag ${REGISTRY}/${PROJECT_NAME}/${SERVICE_NAME}:${TAG} ${REGISTRY}/${PROJECT_NAME}/${SERVICE_NAME}:${ENV_TAG}

push-image:
	docker push ${REGISTRY}/${PROJECT_NAME}/${SERVICE_NAME}:${TAG}
	docker push ${REGISTRY}/${PROJECT_NAME}/${SERVICE_NAME}:${ENV_TAG}
