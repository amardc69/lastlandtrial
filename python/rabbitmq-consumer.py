import pika
import time

# Establish a connection with RabbitMQ server
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare the same queue to ensure it exists
channel.queue_declare(queue='hello')

def callback(ch, method, properties, body):
    """Function to process messages from the queue."""
    print(f" [x] Received {body.decode()}")
    # Acknowledge the message
    ch.basic_ack(delivery_tag=method.delivery_tag)

# Set up the subscription on the 'hello' queue
channel.basic_consume(queue='hello',
                      on_message_callback=callback)

print(' [*] Waiting for messages. To exit press CTRL+C')
# Start consuming messages
channel.start_consuming()