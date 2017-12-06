## Build Management
Use processed like continuous integration to automatically build, test and analyze each change to code base. Can track the status of each commit and report any problems. <br />

### Why?
Important to test integration of any change to code component as it can be very cumbersome to find issues when merging large code bases.<br />

### Benefits?
- Easily detect issues. Instead of waiting for it to be discovered at the end.
- Reduces effort in repetitive processes.
- Ability to release deployable software anytime.
- Easy to analyze failures.

### Risks of not using CI?
- Integration can be lengthy
- Difficult to reproduce testable builds
- Issues are discovered very late in the pipeline
- Difficult to maintain testing and development environments

### Concerns?
- Overhead in maintain CI system
- Inertia of transitioning from legacy systems
- Too many build failures
- Additional costs of hardware/software

### Build Server Workflow
Checkout latest code -> Execute Build Manager -> Test  -> Generaxte Results -> Notify<br />

### Issues
- Projects can take hours to build
- Memory Leaks in tests can lead to repeated reboots of build server
- Large number of changes means large number of builds


Maven Pipeline: <br />
Compile -> Test -> Package -> Verify -> Deploy