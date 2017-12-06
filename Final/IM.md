## Infrastructure Management

### Spread servers over geographical regions:
One of reasons for having multiple servers spread over different geographical locations is to be able to provide services and content at a faster rate to users in different locations. For serving content to a user from a particular location, servers closest to that location are used to ensure the content is made available to the users fast. It also provides the ability to customize the type of content available to users accessing the service from different locations. <br/>
It is a usual practice to have multiple servers in different availability zones. It is done to protect service availability against any events which may cause disruption to service for a particular server. Such events could be like natural disasters, power outages or any other type of event which can cause disruption to service in a particular area. Servers in separate availability zones helps ensure that service doesn't fail completely because of such an event in a particular region. <br/>
It can also be useful in cases of high service load in a particular region. In such a scenario, service request traffic can be redirected to other regions to avoid overload.<br/>



### Ways to speed up an application
Traffic peaks on monday evenings. Use Load Balancing. For certain time, when load is high, spawn new instances for handling extra load. This scaling can happen automatically based on number of requests being served at any moment and current performance of the server. <br />
Avoid slow spin-up for new instances.  Apart from this, some simple ways to free up server resources like not using CPU resources for static requests, can help free up critical resources which can handle more load. Use separate environment for rendering static content.<br />
Real time and concurrent connection with peers. Create Multiple Servers in Separate availability zones. Use Smart DNS to find the closest server to serve the request. This will reduce latency in processing service requests. Use Latency based routing.<br />
Heavy Upload traffic. Use reverse proxy servers like nginx. They are highly scalable. Frees up application server for just handling requests instead of directly serving them. Along with this load balancing can be used to spin up new instances to handle load as per requirements.<br />

