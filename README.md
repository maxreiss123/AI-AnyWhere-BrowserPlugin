# AI-AnyWhere-BrowserPlugin
#OnlyOneSubscriptionForAI

## Motivation

Instead of juggling multiple subscriptions for various AI services, the motivation behind AI-AnyWhere is to offer a single Chrome extension. By simply using an OpenAI API key, users can access a variety of functionalities such as improving writing, translating text, summarizing content, and more. The project is inspired from functionalities like [MaxAI.me](https://www.maxai.me/).

## Use Cases

### UC1: Text Summarization
- **Precondition**: User is on a webpage with textual content.
- **Trigger**: User clicks the 'Summarize' button in the plugin sidebar.
- **Postcondition**: The plugin summarizes the text and displays it in the sidebar.

### UC2: Text Translation
- **Precondition**: User selects text on a webpage.
- **Trigger**: User clicks the 'Translate' button in the plugin sidebar.
- **Postcondition**: The plugin translates the text and displays the translation.

### UC3: Grammar and Tone Correction
- **Precondition**: User selects text in a text box.
- **Trigger**: User clicks the 'Correct' button in the plugin sidebar.
- **Postcondition**: The plugin corrects the grammar and tone of the text.

### UC4: Text Generation
- **Precondition**: User is in a text box.
- **Trigger**: User clicks the 'Generate' button in the plugin sidebar.
- **Postcondition**: The plugin generates text based on the context and fills it in the text box.

### UC5: Query-based Interaction
- **Precondition**: User opens the plugin sidebar.
- **Trigger**: User types a query and hits 'Enter'.
- **Postcondition**: The plugin responds to the query using the AI model.

## Requirements

### Functional Requirements
- **FR1**: The plugin must authenticate the OpenAI API key.
- **FR2**: The plugin must be able to summarize text from webpages.
- **FR3**: The plugin must support text translation.
- **FR4**: The plugin must offer grammar and tone correction.
- **FR5**: The plugin must generate text in text boxes.
- **FR6**: The plugin must support query-based interaction with the AI model.


### Technical Requirements
- **TR1**: The plugin should be developed as a browser extension.
- **TR2**: The plugin should use eg. OpenAI's GPT models for text-based tasks.
- **TR3**: The plugin should have a user-friendly interface.
- **TR4**: The plugin should have an efficient API rate-limiting mechanism.

Starting programing soon :) 
