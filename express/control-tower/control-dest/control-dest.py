
import asyncio
#import pickle
import json

g_obj = {1: 'hi', 2: 'hello'}
#msg = pickle.dumps(g_obj)
msg = json.dumps(g_obj)
msg = bytes(msg, 'utf-8')

async def asRun():
	reader, writer = await asyncio.open_connection('127.0.0.1', 3002);
	#message = 'hello world'
	#print(f'send: {message!r}')
	#writer.write(message.encode())
	#print(msg);
	#writer.write(msg)

	while True:
		data = await reader.read(100)
		if len(data) == 0:
			exit();
		data = data.decode()
		print(f'received: {data!r}')
		if data == 'ctl -p':
			print(f'print')
			writer.write(msg)
		else:
			print(f'unknown')


def run():
	loop = asyncio.new_event_loop()
	loop.run_until_complete(asRun())

if __name__ == "__main__":
	run()
