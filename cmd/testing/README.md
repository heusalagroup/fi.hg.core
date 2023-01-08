## System testing library

These functions are meant to be used from inside tests that test command line
tools.

* `log(message)` - Print short log message
* `chdir(dir)` - Change current working directory
* `run(cmd)` - Run command (inside shell!)

Note! Keep in mind, they are synchronous.
