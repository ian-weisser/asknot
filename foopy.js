(function($) {
    var groupNode;
    var choiceIndex = [];
    var choices     = [];
    var stack       = [];

    function chooseNegativeResponse() {
        var responses = $('.negative').not('.visible');

        return responses[Math.floor(Math.random() * responses.length)];
    }

    function updateNegativeResponse() {
        var negative = chooseNegativeResponse();

        $($('.negative.visible')[0]).removeClass('visible');
        $(negative).addClass('visible');
    }

    function trackExternalLink() {
      window.ga('send', 'event', 'outbound', 'click', $('#ok')[0].firstChild.href);
    }

    function incrementAndWrap(curr, max) {
        if(max === undefined) {
          max = $('.choices li', groupNode).length;
        }
        curr++;
        if (curr === max) {
          curr = 0;
        }
        return curr;
    }

    function updateCurrentChoice(lastIndex) {
        var lastChoice = $('.choices li', groupNode)[choices[choices.length - 1][lastIndex]];
        var choice     = $('.choices li', groupNode)[choices[choices.length - 1][choiceIndex[choiceIndex.length - 1]]];
        var nextChoice = $('.choices li', groupNode)[choices[choices.length - 1][incrementAndWrap(choiceIndex[choiceIndex.length - 1])]];

        updateNegativeResponse();
        lastChoice.style.display = 'none';
        choice.style.display = 'inline';
        var button = $('#ok')[0];
        button.removeEventListener('click', trackExternalLink);
        var isExternal = choice.hasAttribute('target');
        button.firstChild.href = !isExternal ?
            '#!/' + stack.join('/') + '/' + getUIDAttribute(choice) + '/' : choice.getAttribute('target');

        $('#next a:first').attr('href', '#!/' + stack.join('/') + '/' + getUIDAttribute(nextChoice));
        $('#back a:first').attr('href', '#!/' + stack.join('/', stack.slice(stack.length - 1, 1)));

        if (isExternal) {
          button.addEventListener('click', trackExternalLink);
        }
        setLocationHashSuffix(getUIDAttribute(choice));
    }

    function nextChoice(ev) {
        if(ev.which === 2) {
          return;
        }
        ev.preventDefault();
        var lastIndex = choiceIndex[choiceIndex.length - 1];

        choiceIndex[choiceIndex.length - 1] = incrementAndWrap(lastIndex);
        updateCurrentChoice(lastIndex);
    }

    function switchGroup(group, choiceId) {
        groupNode = document.getElementById(group);

        if (!stack.length || stack[stack.length - 1] !== group || choiceId) {
          if ( $.inArray(group, stack) < 0 ) {
            stack.push(group);
          }

          if ( ! choiceId ) {
            choiceIndex.push(0);
          }

          setGroupChoices(group, choiceId);
        }

        var firstChoice = $('#wrapper > div')[0].id;
        $('#back')[0].style.display = group === firstChoice ? 'none' : 'block';
        $('#next')[0].style.display = group !== firstChoice && choices[choices.length - 1].length == 1 ? 'none' : 'block';
        $('.question', groupNode)[0].style.display = 'block';
        updateCurrentChoice(choiceIndex[choiceIndex.length - 1]);
    }

    function cleanUpCurrent() {
        if (!groupNode) {
            return;
        }
        $('.question', groupNode)[0].style.display = 'none';
        var lastChoice = $('.choices li', groupNode)[choices[choices.length - 1][choiceIndex[choiceIndex.length - 1]]];
        lastChoice.style.display = 'none';
    }

    function investigate(ev) {
        if(ev.which === 2) {
          return;
        }
        ev.preventDefault();
        var choice = $('.choices li', groupNode)[choices[choices.length - 1][choiceIndex[choiceIndex.length - 1]]];
        if (choice.hasAttribute('next-group')) {
            cleanUpCurrent();
            switchGroup(choice.getAttribute('next-group'));
        } else {
            window.open(choice.getAttribute('target'));
        }
    }

    function takeBack(ev) {
        if(ev.which === 2) {
          return;
        }
        cleanUpCurrent();
        setLocationHashSuffix("");
        stack.splice(stack.length - 1, 1);
        choiceIndex.splice(choiceIndex.length - 1, 1);
        choices.splice(choices.length - 1, 1);
        switchGroup(stack[stack.length - 1]);
    }


    function setLocationHashSuffix(value) {
        var midValue = stack.join("/");

        window.location.hash = "#!/" + midValue + "/" + value;
    }


    function setGroupChoices(group, choiceId) {

        //+ Jonas Raoni Soares Silva
        //@ http://jsfromhell.com/array/shuffle [rev. #1]
        function shuffle(v) {
            for (var j, x, i = v.length; i; j = parseInt(Math.random() * i, 10), x = v[--i], v[i] = v[j], v[j] = x){}
            return v;
        }

        var collector = [],
            elements  = $('.choices li', groupNode),
            memo      = 0;

        for (var i = 0; i < elements.length; i++) {
            if (choiceId && getUIDAttribute(elements[i]) == choiceId) {
              memo = i;
            }

            collector.push(i);
        }

        collector = shuffle(collector)

        if (choiceId) {
          choiceIndex.push( $.inArray(memo, collector) );
        }

        choices.push(collector);
    }

    function getUIDAttribute(choice) {
      return choice.getAttribute("next-group") || choice.getAttribute("data-choice-id");
    }

    function supportsPushState() {
      return !! (window.history && history.pushState);
    }


    window.onpopstate = function(event) {
    }

    $(window).load(function() {
        $('#ok a:first').on('click', investigate);
        $('#next a:first').on('click', nextChoice);
        $('#back a:first').on('click', takeBack);

        var defaultGroup = "toplevel";


        // Check for permalink
        if (window.location.hash.length > 1) {
            var query      = window.location.hash,
                queryParts = query.split("/");

            window.ga('send', 'pageview', query);

            queryParts.shift(); // Dropping '#!'

            var savedGroup  = defaultGroup,
                savedChoice = queryParts.pop();

            cleanUpCurrent();

            stack = queryParts.length ? [defaultGroup] : [];
            if (queryParts.length) {
              stack = stack.concat(queryParts.slice(1, queryParts.length - 1));

              $.each(queryParts.slice(0, queryParts.length - 1), function(i, v) {
                groupNode = document.getElementById(v);
                setGroupChoices(v, queryParts[i + 1]);
              });

              savedGroup = queryParts.pop();
            }

            switchGroup(savedGroup, savedChoice);
        } else {
            switchGroup(defaultGroup);
        }
    });
})(window.jQuery);
