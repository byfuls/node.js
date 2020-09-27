.SUFFIXES: .cpp .cc .o

CC = gcc
CXX = g++ -std=c++11
INCS = 
LIBS = -lpthread
CFLAGS = -g $(INCS)
CXXFLAGS = -g $(INCS)

OBJS = client.o
SRCS = $(wildcard *.cpp)

TARGET = virclient
$(TARGET) : $(OBJS)
	$(CXX) -o $@ $(OBJS) $(INCS) $(LIBS)

clean:
	rm -f $(OBJS) ${TARGET} core*

new:;
	$(MAKE) clean
	$(MAKE)
