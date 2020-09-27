.SUFFIXES: .cc .o

CC = gcc
INCS = 
LIBS = -lpthread
CFLAGS = -g $(INCS)

OBJS = client.o
SRCS = $(wildcard *.c)

TARGET = virclient
$(TARGET) : $(OBJS)
	$(CC) -o $@ $(OBJS) $(INCS) $(LIBS)

clean:
	rm -f $(OBJS) ${TARGET} core*

new:;
	$(MAKE) clean
	$(MAKE)
