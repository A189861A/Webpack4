import _ from 'lodash'
import './c.css'

function component() {
  let element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'pageC'], ' ')

  return element
}

document.body.appendChild(component())
