#
# test.py
#

import unittest

# import functions from other file
from math import add, minus, divide, multiple

class TestMathMethods(unittest.TestCase):

    def test_add(self):
        result = add(1,2)
        self.assertEqual(result, 3)

    def test_minus(self):
        result = minus(1,2)
        self.assertEqual(result, -1)

    def test_multiple(self):
        result = multiple(1,2)
        self.assertEqual(result, 2)

    def test_divide(self):
        result = divide(3, 3)
        self.assertEqual(result, 1)


if __name__ == '__main__':
    unittest.main()
