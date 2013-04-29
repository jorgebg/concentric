
build:
	livescript -o ./lib/ -c ./src/*.ls
	livescript -c ./test/*.ls


.PHONY: build