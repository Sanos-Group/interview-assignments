# React Native Developer Assignment

The task is to build a chatbot that interacts with the user to obtain information from him. Internally, the chatbot uses
a decision tree in order to choose the next question. The provided [DEMO](demo.mov) shows the **expected** behaviour on
the example of one particular flow.

## Resources

- [Figma UI specs](https://www.figma.com/file/7Q3YlbvYtywOu6ZZ8Ft6SN/Code-Assignment?node-id=0%3A1)
- [mockup server](mock-api)

The **mockup server** serves with the next question given the answer of the user.

Run below command to create a **reverse proxy** in order to make the server accessible for the app
at **http://localhost:<PORT\>** whereby **<PORT\>** is a placeholder.

```bash
$ adb reverse tcp:<PORT> tcp:<PORT>
```

## Submission

The source code should be provided as zip file named as **<your_family_name\>_<your_first_name\>.zip**.

Please, send the zip file to `oscar.morillo@sanosgroup.co` with the subject: `React Native Developer - Submission`.

## Evaluation

### Environment

- Java 11
- node v16.15.0

### Metrics of quality

The quality of your solution will be assessed based on the following criteria:

- Correctness
- Code Quality

**Note:** Code Quality includes not only the code but also actions made and/or tools taken in order to ensure for high quality. ;)

## Questions

Should you have any questions, write me an email to **oscar.morillo@sanosgroup.co**
