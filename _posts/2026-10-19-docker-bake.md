---
layout: post
title: "Welcome to pork-ops"
date: 2026-10-12 10:00:00 +0200
categories: meta
lang: en
permalink: /2026/10/19/welcome-to-pork-ops/
---

This is the first post. Today we will take a look to docker bake!

## What is docker bake?

Docker bake is a feature from Docker Buildx that lets you define your build configuration using a declarative file, as opposed to specifying a complex CLI expression. It also lets you run multiple builds concurrently with a single invocation. See https://docs.docker.com/build/bake/. 

This allows to take the same approach we do with infrastructure: we define what we want, and docker buildx will manage to get there. Therefore, as you can imagine, languages that are typically used for declarative setups, like hcl (terraform language) can be used here!

```bash
group "default" {
  targets = ["frontend", "backend"]
}

target "frontend" {
  context = "./frontend"
  dockerfile = "frontend.Dockerfile"
  args = {
    NODE_VERSION = "22"
  }
  tags = ["myapp/frontend:latest"]
}

target "backend" {
  context = "./backend"
  dockerfile = "backend.Dockerfile"
  args = {
    GO_VERSION = "1.26"
  }
  tags = ["myapp/backend:latest"]
}
```

The official example defines:
- 2 target images, frontend and backed, each one with its own folder, dockerfile and args. They will produce one tag each. 
- A group, that tells docker which targets can be built concurrently. 

You then just run:
```bash
docker buildx bake
```
and you will get you two images built. Notice this normally would be the following code:
```bash
cd frontend
docker buildx build -f frontend.Dockerfile --build-arg NODE_VERSION="22" -t "myapp/frontend:latest"
cd ../backend
docker buildx build -f backend.Dockerfile --build-arg GO_VERSION="1.26" -t "myapp/backend:latest"
```

You can see just 2 images starts to open a lot of doors for creating small differences between different repositories, which eventually leads to each team building their images in their on way, with custom pipelines that only the person, or maybe not even that, that built them knows how they work. 

With docker bake you can move that custom bash code into hcl files, which allows for easier standarization. 

## How it works?
You need to follow the bake specification from https://docs.docker.com/build/bake/reference/. However, you will find that most of the parameters match 1:1 with the docker cli commands. This makes using bake even easier!

The 4 types of resources allowed are:
- Target: the definition of an image we want to built (notice this may cover several platforms)
- Group: which allows to specify several targets so we built them at the same time. This is a logical grouping. 
- Variable: this allows for Don't repeat yourself variables. This is the same as Terraform. 
- Functions: I havne't personally find yet an usage for them, but you can find them here https://github.com/docker/buildx/blob/master/docs/bake-stdlib.md. They allow to perform some basic operations. However is more than likely that anything you need to compute, arrives to the bake file as injecetd variables. 

You can find a full example here: https://github.com/pork-ops/docker-bake/blob/main/docker-bake.hcl. However, you will notice one thing, if you just use docker bake, for the platforms different from the one where you run the command, it will require to use emulation, which can become slow. See https://docs.docker.com/build/building/multi-platform/#strategies. 

However, if we combine github actions with docker bake, we can very conveniently set this up in a way that we build each image in its native platform (this is the second strategyb from the docker multi-platform strategies link): https://github.com/pork-ops/docker-bake/actions/runs/39277449388. Notice we don't need any bash for all of this, this is just official actions and their parameters https://github.com/pork-ops/docker-bake/actions/runs/39277449388/workflow#L36. 

So now, you have a way to make it standard for everyone!