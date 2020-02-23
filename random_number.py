from random import randint
import sys

_MIN_VALUE = int(sys.argv[1])
_MAX_VALUE = int(sys.argv[2])
_THRESHOLD = int(sys.argv[3])

random_num = randint(_MIN_VALUE, _MAX_VALUE)
print(f"Selected Random value : {random_num}")


isSuccess = random_num > _THRESHOLD

if isSuccess:
    print(f"Random number {random_num} is greater than {_THRESHOLD}")
    sys.exit(0)
else:
    print(f"Random number {random_num} isn't greater than {_THRESHOLD}")
    sys.exit(1)
    

