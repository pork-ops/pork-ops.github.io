---
layout: post
title: "Oracle"
date: 2026-11-06 10:00:00 +0200
categories: oracle
lang: en
permalink: /2026/11/06/oracle-networking/
---


# VNCs
Virtual cloud networks or VNCs is the network container where you can create subnets to handle your traffic. They are equivalent to VPCs, this means, they have one or more subnets and one or more CIDRs. You can see more information about them in https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/Overview_of_VCNs_and_Subnets.htm. 

Each VCN has one or more subnets, that can be specific for different purposes: private, public, databases... You define how each of these behave for traffic leaving the VCN by using the route tables https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/managingroutetables.htm, these are equivalent to the AWS Route tables. 

# VNICs
This is the name for the specific network devices that hold an ip in our VNCs/Subnets. This is equivalent to the ENI (Elastic Network Interface) in AWS. 

# Egress traffic from the VNCs
You can egress traffic to the internet trough 2 main ways (however more are always possible), these are:
- Internet gateway: this is for public subnets, the VNICs in the given subnet will be reachable trough the internet and they will get a public ip to be able to reach the internet (and be reached).
- Nat gateway: this is for private subnets, the VNICs here use their private ip to get to the nat gateway, which translates the packages using its own public ip, so from the outside you just see the nat gateway public ip, being unable to reach any internal ips from the exterior. 

# Accesing Oracle Cloud services
There are two ways to access OCI servcies without going trough the internet:
- Private endpoint: for these services https://www.oracle.com/cloud/networking/private-endpoint/supported-services/. 
- Service gateway or a Private Service Access endpoint: for these services https://www.oracle.com/cloud/networking/private-service-access/service-gateway-and-psa-supported-services/. 

The main difference between the 3 types is:
1. Private Endpoint:  Private access to a specific resource.
2. Private Service Access (PSA) Endpoint: Private IP access to an entire OCI service.
3. Service Gateway: Private network routing to multiple OCI services, using their public service endpoints. 

# Connecting different VNCs
You can use two systems to connect different VNCs:
- Peering: it may be local (same region) or remote (different regions). This is recommended for 1:1 connections. 
- Dynamic Routing Gateway: this is the same as the Transit Gateway in AWS. This is the recommended approach when you want to inter-connect several VNCs, allowing up to 300 attachments. 

# Load Balancers
The Load Balancer service provides a reverse proxy solution that hides the IP of the client from backend application server and in reverse. It can perform advanced layer 7 (HTTP/HTTPS), layer 4 (TCP) load balancing and SSL offloading. You can define the size of the load balancer: see https://docs.oracle.com/en-us/iaas/Content/Balance/Tasks/managingloadbalancer_topic-Changing_the_Load_Balancer_Bandwidth.htm. They can be public or private. 
The Network Load Balancer service provides a pass-through (non-proxy solution) that can preserve the client header (source and destination IP).

# Connect to your VNCs
You can use two options:
- FastConnect: provides an easy way to create a dedicated, private connection between an on-premises data center and Oracle Cloud Infrastructure. This is the same as AWS Direct Connect. 
- Site-to-site VPN: this is an standard VPN granting access trough the internet when properly authenticated. 

# Firewalls
Oracle offers two virtual firewall features to control traffic at the packet level:
- Security lists: This is the original type of virtual firewall offered by the Networking service. A security list consists of a set of ingress and egress security rules that apply to all the VNICs in any subnet that the security list is associated with. This means that all the VNICs in a particular subnet are subject to the same set of security lists.
More info https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/securitylists.htm. 
- Network security groups: not surpported by all resources yet, they are preferred however when avaliable. Apply to specific VNICs (vs Security list that apply to the full subnet).

Both rely on Security Rule which define which traffic is allowed, without any rules, no traffic is allowed. The rules itself can be stateful or stateless (not like in AWS). You specify the direction of the traffic, the port, protocol... and then you get it allowed to pass trough. 