# Sequence Diagram Generator

A simple markdown-like script language for generating UML sequence diagram from textual representation of the diagram using javascript and HTML canvas.

[Try here](https://monzilnepali.github.io/Sequence-diagram-generator/)


**Steps:**

<img src="https://user-images.githubusercontent.com/28225895/85564236-cf9aff00-b64d-11ea-89f4-0551888deaf2.png" height="180px"/>


|Syntax| Action |
|--|--|
| `Title: <diagram_name>`  | Title of diagram |
| `Actor1 -> Actor2: message` | Actor1 send message to Actor2|
| `Actor2 --> Actor1: reply message` | Actor2 reply to Actor 2|
| `Actor1 -> Actor1: message` | Self call |

**Example:**
```
Title: ATM Transaction Sequence Diagram

User -> ATM:  Card insert
ATM --> User: Enter your pin code
User -> ATM:  PIN code send
ATM -> bank:  Check this details
bank -> bank: Verify Pin code
bank -> ATM:  Authorized
ATM -> User:  Enter amount
```
**Output:**

<img src = "https://user-images.githubusercontent.com/28225895/85560273-39190e80-b64a-11ea-88ca-b6290dc22f21.png" height="350px"/>
