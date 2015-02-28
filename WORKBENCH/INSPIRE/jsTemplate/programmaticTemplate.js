<script>
function compile (CONTAINER, DATA) {
  //// SELECT:
  // getElementById() and getAttribute() and querySelector...

}
</script>
<!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
<!--
  SYNTAX INSPIRATION - WELD

  // TARGET NODE
  // DATA
  // [CONFIG]
-->
<script>
{
  alias: {
    'user_password': false, // causes an item to not get rendered

    'user_email': 'email', // use email instead of user_email in the weld match process

    'user_name'     : function(parent, element, key, value) {
      // element is a DOM Element which will be searched for the current key

      // use fullName in place of user_name
      return "fullName"
    },

    'user_hometown' : function(parent, element, key, value) {
      // use an element instead of allowing weld to match based on class/id/name
      return element.getElementById('hometown');
    },

    'personal_info'  : function(parent, element, key, value) {
      if (session.authorized() === false) {
        // The user requesting this template is not authorized to view other users' personal information so remove the personal info display from the page
        var emailDisplay = element.getElementById('personal_info');
        emailDisplay.parentNode.removeChild(emailDisplay);

        // and return false, which will stop weld from traversing the current branch (personal_info)
        return false;
      }
    }

  }
}
</script>

<ul class='contacts'>
  <li class='contact'>
    <span>Hello my name is <span class='firstAndLast'>My Name</span></span>
    <p class='title'>Leet Developer</p>
  </li>
</ul>
<script>
  // Use .contact as the template and data as the data...

  var

  var
    data      = [
      { name: 'hij1nx',  title: 'code exploder' },
      { name: 'tmpvar', title: 'code pimp' }
    ],
    template  = document.getElementByClassName('contact')[0]
  ;
  // Since there is no .name class in the markup, we need to alias name to something that does exist..

  weld(template, data, { alias: { 'name': 'firstAndLast' } });
</script>


<!-- INSERT DATA INTO TEMPLATES

ATOMIC VALUES
vs.
ARRAYS
vs.
OBJECTS

//// FALLBACK MECHANISMS
(all user interaction has to fallback on "new page loads", when there is no javascript) -->
