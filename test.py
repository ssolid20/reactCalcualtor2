from sympy import Integral, Symbol,sympify,S, solve,Derivative,Limit,simplify,cos,sin,log
import sys, json
import sympy
from sympy import Symbol
x = Symbol('x')
y = Symbol('y')
z = Symbol('z')
r= 'x+2'
#t = 'solve((' + x +'),dict=True)'
#print(t, type(x))
#x = eval(t)
print(solve(r))