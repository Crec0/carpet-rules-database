$('#rules').on('click', '.ruleName', function(e) {
   const thisRule = e.target.closest('.rule');
   const rules = document.getElementById('rules');
   const allCollapsed = rules.classList.contains('allCollapsed');
   if (e.altKey) {
      const open = (allCollapsed && thisRule.classList.contains("notCollapsed")) || (!allCollapsed && !thisRule.classList.contains("collapsed"));
      // if the rule isn't in a toggled state against the current state
      if (!((allCollapsed && open) || (!allCollapsed && !open))) {
         rules.classList.toggle('allCollapsed');
      }
      for (rule of rules.children) {
         rule.classList.remove("collapsed");
         rule.classList.remove("notCollapsed");
      }
   } else {
      thisRule.classList.toggle(allCollapsed ? "notCollapsed" : "collapsed");
   }
});
