## Example used

```
import withTags from 'withTags';

class App extends Component {
  render() {
    const text = 'Hi @all! #foo and #bar etc. @Kuba';
    const options = {
      tags: [
        {
          pattern: /#(\w+)/g,
          component: ([, value], index) => <Tag key={index}>{value}</Tag> 
        },
        {
          pattern: /@(\w+)/g,
          component: ([, value], index) => <User key={index}>{value}</User> 
        }
      ]
    };
    return (
      <div>
        {withTags(text, options)}
      </div>
    );
  }
}
```