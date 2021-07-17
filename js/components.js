Vue.component('resource-item', {
  props: ['resource'],
  template: '<tr class="resource-row"><td>{{ resource.name }}:</td> <td>{{ resource.amount }}</td> <td>/</td> <td>{{ resource.cap }}</td> <td>{{ resource.rate }} m/s</td> </tr>'
})