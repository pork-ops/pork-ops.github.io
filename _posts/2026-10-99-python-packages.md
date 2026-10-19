---
layout: post
title: "Python venvs"
date: 2026-10-20 10:00:00 +0200
categories: python
lang: en
permalink: /2026/10/20/python-venvs/
---

This blogs aims to cover the python change that lead to the usage of python venvs. Because this bites me everytime I want to install a package into a one time machine. 

## How python manages dependencies?
Python calls the dependencies packages. Therefore, we need to install these packages to be able to use them. Old in the day, like a lot of years ago, you would go, install the packages on any way you could get them working, including ```sudo apt-get install python-numpy python-scipy```. The first thing you will notice is that... well, you install a python package with apt-get! Yes, because back in the day, they were delivered as OS packages. However, while this was super-fast for beginners, it usually causes people to have a mess in their laptops. Why? These OS packages install the package at the OS level, meanign globally. However, it wasn't rare that people them installed the exact same packages with pip. Which resulted in people having several layers with different versions of the same package and... when people run into issues... good luck with that! 

This resulted in https://peps.python.org/pep-0668/, which basically "specifies that Python-specific package management tools should neither install nor remove packages into the interpreter’s global context, by default, and should instead guide the end user towards using a virtual environment." So yes this basically says hey stop installing packages globally use the venvs isntead! 

Since that release, you will get an error requiring to use --break-system-packages to perform pip installs againt's the python install from your distribution. As you can imagine, you don't want to use a flag named "break" anything. Let's see what we need to do. 

## Virtual environments
The Virtual environments (usually called venvs) allow to manage the packages for a python project in an isolated way. This means, for a given project you create a virtual environment where you can install python packages, that only get applied to the given environment. This way, you can keep a 1:1 match between virtual environments and projects, finishing for ever the issue of installing globally these packages. However, there is one disadvantage. Notice this will require a copy of tha packages for each project where they are used, which means lager space usage by duplicate resources (if you install the exact same version in several places).

To create a virtual environment:
```bash
python3 -m venv .venv                   # Creates a hidden folder, you can use a normal folder, with the virtual environment
source .env/bin/activate                # This enables the venv, now python will oint to this virtual env
python3 -m pip install ANY_PACKAGE      # This install a given package in the venv
python3 main.py                         # This runs code with the packages in the venv
deactivate                              # This disables the venv
```

If you perform a cat of the activate file, you will find a simple script that stores some env variables in "old" prefixed variables, while it points the python standard ones to the venv, modifying also the path. With this, you basically point your python installation to the venv and that is all the magic. When you deativate, it re-uses the "old" prefixed variables to return to the previous state. 

# More in the future
There are more powerful package managers. In particular, uv, written in rust, provides the same features while being a lot quicker. 