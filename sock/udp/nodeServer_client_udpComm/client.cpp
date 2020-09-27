/***************************************************************************/
/*                                                                         */    
/* Client program which gets as parameter the server name or               */    
/*     address and tries to send the data into non-blocking server.        */    
/*                                                                         */    
/* The message is sent after 5 seconds of wait                             */    
/*                                                                         */    
/*                                                                         */    
/* based on Beej's program - look in the simple TCp client for further doc.*/    
/*                                                                         */    
/*                                                                         */    
/***************************************************************************/
#include <stdio.h> 
#include <stdlib.h> 
#include <errno.h> 
#include <string.h> 
#include <netdb.h> 
#include <sys/types.h> 
#include <netinet/in.h> 
#include <sys/socket.h> 
#include <unistd.h>
#include <pthread.h>

#define PORT 2220 /* the port client will be connecting to */
#define IP "127.0.0.1"
#define MSG "HI"
#define MAXBUFLEN 1024

typedef struct {
	int sockfd;
	struct sockaddr_in addr;
}tmpAddr;

void *vir_sender(void *args)
{
	tmpAddr *addr = (tmpAddr *)args;
	int numbytes;
	int once = 0;
	while (1) {
		if(!once){
    		if ((numbytes=sendto(addr->sockfd, MSG, strlen(MSG), 0, \
    		     (struct sockaddr *)&addr->addr, sizeof(struct sockaddr))) == -1) {
    		    perror("sendto");
    		    exit(1);
    		}else{
				printf("send ok\n");
			}
			once++;
		}
		sleep(1);
	}
	close(addr->sockfd);
	return 0;
}

void *vir_receiver(void *args)
{
	tmpAddr *addr = (tmpAddr *)args;
	unsigned int addr_len;
	int numbytes;
	char buf[MAXBUFLEN] = {0,};
	while (1) {
		memset(buf, 0x00, sizeof(MAXBUFLEN));
        if ((numbytes=recvfrom(addr->sockfd, buf, MAXBUFLEN, 0, \
                           (struct sockaddr *)&addr->addr, &addr_len)) == -1) {
            perror("recvfrom");
            exit(1);
        }else{
			printf("received msg: %s\n", buf);
		}
	}
}

int main(int argc, char *argv[])
{
	int sockfd;
	if ((sockfd = socket(AF_INET, SOCK_DGRAM, 0)) == -1) {
		perror("socket");
		exit(1);
	}
	struct sockaddr_in their_addr; /* connector's address information */
	struct hostent *host = (struct hostent *)gethostbyname((char *)IP);
	their_addr.sin_family = AF_INET;      /* host byte order */
	their_addr.sin_port = htons(PORT);    /* short, network byte order */
	their_addr.sin_addr = *((struct in_addr *)host->h_addr);
	bzero(&(their_addr.sin_zero), 8);     /* zero the rest of the struct */

	tmpAddr addr;
	memset(&addr, 0x00, sizeof(tmpAddr));
	addr.sockfd = sockfd;
	memcpy(&addr.addr, &their_addr, sizeof(struct sockaddr_in));

	pthread_t p_sender, p_receiver;
	int thr;
	thr = pthread_create(&p_sender, NULL, vir_sender, (void *)&addr);
	if(thr < 0){
		printf("pthread create sender error\n");
	}
	thr = pthread_create(&p_receiver, NULL, vir_receiver, (void *)&addr);
	if(thr < 0){
		printf("pthread create receiver error\n");
	}

	while(1){
		sleep(1);
	}
	return 0;
}
