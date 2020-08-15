from sympy import Integral, Symbol,sympify,S, solve,Derivative,Limit,simplify,cos,sin,log, latex,pprint
import sys, json
import sympy
import math 
from sympy import Symbol
x = Symbol('x')
y = Symbol('y')
z = Symbol('z')
#Read data from stdin

  
g= 'x^2,x+3,cos(x),log(x,10)'
t = 'solve((x**3-50),dict=True)'
x = eval(t)
print(x)    
print(g.split())
for f in g.split(sep=')'):
    print(f)

    #use numpys sum method to find sum of all elements in the array
   #return the sum to the output stream
    

#start process


