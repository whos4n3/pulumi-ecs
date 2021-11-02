import * as awsx from "@pulumi/awsx";

// Create a load balancer on port 80 and spin up two instances of Nginx.
const lb = new awsx.lb.ApplicationListener("nginx", { port: 80 });
const nginx = new awsx.ecs.FargateService("nginx", {
    taskDefinitionArgs: {
        containers: {
            nginx: {
                image: awsx.ecs.Image.fromPath("022166486589.dkr.ecr.eu-west-2.amazonaws.com/nginx-gif", "/Users/husseinmohamed/Desktop/pulumi"),
                memory: 128,
                portMappings: [ lb ],
            },
        },
    },
    desiredCount: 2,
});

// Export the load balancer's address so that it's easy to access.
export const url = lb.endpoint.hostname;
