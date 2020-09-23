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

#define PORT 2220 /* the port client will be connecting to */
#define IP "127.0.0.1"
#define MSG "HI"

#define MAXDATASIZE 100 /* max number of bytes we can get at once */

void *vir_client(void *args)
{
	int sockfd, numbytes;  
	char buf[MAXDATASIZE];
	struct hostent *he;
	struct sockaddr_in their_addr; /* connector's address information */

	//if (argc != 2) {
	//	fprintf(stderr,"usage: client hostname\n");
	//	exit(1);
	//}

	//if ((he=gethostbyname(argv[1])) == NULL) {  /* get the host info */
	//	herror("gethostbyname");
	//	exit(1);
	//}

	if ((sockfd = socket(AF_INET, SOCK_DGRAM, 0)) == -1) {
		perror("socket");
		exit(1);
	}

	their_addr.sin_family = AF_INET;      /* host byte order */
	their_addr.sin_port = htons(PORT);    /* short, network byte order */
	their_addr.sin_addr.s_addr = inet_addr(IP);
	bzero(&(their_addr.sin_zero), 8);     /* zero the rest of the struct */

	while (1) {
    	if ((numbytes=sendto(sockfd, MSG, strlen(MSG), 0, \
    	     (struct sockaddr *)&their_addr, sizeof(struct sockaddr))) == -1) {
    	    perror("sendto");
    	    exit(1);
    	}
		usleep(100);
	}
	close(sockfd);
	return 0;
}

#define MAX_THREAD_COUNT	30
int main(int argc, char *argv[])
{
	pthread_t threads[MAX_THREAD_COUNT];
	int i, thr;

	for(i=0; i<MAX_THREAD_COUNT; i++){
		thr = pthread_create(&threads[i], NULL, vir_client, (void *)NULL);
		if(thr < 0){
			printf("pthread create error\n");
		}
	}
	while(1){
		sleep(1);
	}
	return 0;
}
