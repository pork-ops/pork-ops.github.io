---
layout: post
title: "Machine learning: components"
date: 2026-10-24 10:00:00 +0200
categories: ml
lang: en
permalink: /2026/10/24/components-ml/
---

Every couple of month I revisit my ML basics. It may be in some website, some tweet or some news. But I eventually always end in the same spot: I don't remember the different components that create ML system. So this post aims to work as a note for myself to remember all the components. 

# Components of a machine learning system
We will be covering the following components:
- Data
- Model itself
- Loss/objective function
- Gradients
- Optimizer
While we may argue about evaluation, hyperparameters and other stuff as being part of the system, I want to ficus in these ones since it's really easy to remember what are the evaluation and hyperparameters by just reading it once in your life. 

## Data
The first component is the data, the data we use to train a model is as important as any other part. Why? The model simply learns to find patterns in the data so if the data is bad, the model will be bad. Dot. There is nothing more. 

Ideally, we want to have as much data as possible, the more the better, but it must have a certain level of quality, which may be hard to measure. Sometimes you learn you data is bad once you have train the model. 

Example: Data=[(1,3),(2,5),(3,7)] (pairs of value, correct response)

## Model
This is the math returning a result for a given input. This is a function with some adjustable parameters. For the smallest sample, we have f(x) = mx + b. For a given input, x, we provide a response by injecting x in the function. We have 2 parameters that we can adjust, m and b, the bias. We won't be covering anything deeper than this. We just want to know that the model is the one that for a given input, returns a response (which may be a ton of different things).

Example: f(x) = mx + b

## Loss/objective function
This is the way the model evaluates it's performance during training so it can learn from it's errors. Basically, for every response the model returns, see how much it deviates from the actual response. An example is Mean Squared Error. This allows to know if we are improving or not. 

Example: L=(1/3) * (m+b-3)^2+(2m+b-5)^2+(3m+b-7)^2 (notice this is just the MSE function with out linear function, the model, and the data we have injected).

## Gradients
Now we need to minimize the loss. How? Easy! We take the loss function and our model and we calculate the derivative, which allows us to work towards finding the way to get the minimun (this is why we look for specific loss functions where this process is easy to perform). Notice we are minimizing the loss of our model. 

In our example the derivatives would be:
![Exmple derivatives for our loss function](/assets/images/gradients.png)

Now we simply input the train data and we average the values, we should end up with a vector with the form (parameter_1_gradient, parameter_2_gradient). This is how we would change the parameters of our model to make the loss function smaller. 

## Optimizer
Now we need to feed the information from the gradients back to the model. Notice all these steps usually happens in batches of data, which means, you don't want to completely move the parameters to perfectly predict the current batch of data, why? Because then the model only predicts the data from that specific batch but nothing else. You want the model to generealize so it's able to provide meaningul predictiongs when exposed to data it has never seen before. 

For this, we usually only backpopulate some of the information from the gradients. The easiest way, is to just use a learning_rate, so we modify each parameter of the model with the path the gradient shows, but with an small rate, for example, 0.01. 

# Conclusion
So we have briefly reviwed the different components a ML model uses to learn. That would be all for today! 