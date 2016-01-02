/// <reference path='_all.ts' />

module exercises {

  export function animateRubber(): ng.IDirective {
    return {
      link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
        $(element).on("click", function() {
          $(this).addClass('remove-btn-animate').delay(200).queue(function(next: any) {
            $(this).removeClass('remove-btn-animate');
            next();
          });
        });
      }
    }
  };

  export function animateButton(): ng.IDirective {
    return {
      link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
        $(element).on("click", function() {
          $(this).addClass('nav-btn-animate').delay(200).queue(function(next: any) {
            $(this).removeClass('nav-btn-animate');
            next();
          });
        });
      }
    }
  };

  export function draggableObject($rootScope: any): ng.IDirective {
    return {
      link: ($scope: ng.IScope, element: JQuery, attr: any) => {
        var alreadyDropped = false;
        var hideObject = function() {
          $(element).css({
            top: "230px",
            left: "-200px",
            height: "120px"
          });
          $rootScope.$emit('hideObject', {
            objectId: attr.id
          });
        };
        $rootScope.$on('hide.with.rubber', function(event: any, args: any) {
          if (args.objectId == attr.id) {
            alreadyDropped = false;
          }
        });
        $(element).draggable({
          revert: "invalid",
          stop: function(event, ui) {
            if (ui.helper.data('dropped-target') == true && alreadyDropped != true) {
              $(this).animate({
                height: attr.originalHeight
              }, 200);
              $rootScope.$emit('dropped', {
                objectId: attr.id
              });
              alreadyDropped = true;
            }
            else if (ui.helper.data('dropped-origin') == true) {
              ui.helper.data('dropped-target', false);
              ui.helper.data('dropped-origin', false);
              alreadyDropped = false;
              hideObject();
            }
          }
        });
        $(element).on("click", function() {
          if (alreadyDropped == true) {
            hideObject();
            alreadyDropped = false;
          }
          else {
            $(this).animate({
              height: attr.originalHeight,
              top: attr.targetTop,
              left: attr.targetLeft
            }, 200);
            alreadyDropped = true;
            $rootScope.$emit('dropped', {
              objectId: attr.id
            });
          }
        });
      }
    }
  };

  draggableObject.$inject = ['$rootScope'];

  export function droppableObject(): ng.IDirective {
    return {
      link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
        $(element).droppable({
          drop: function(event, ui) {
            if (ui.draggable.data('dropped-target') != true) {
              ui.draggable.data('dropped-target', true);
              ui.draggable.data('already-dropped', false);
              ui.draggable.data('dropped-origin', false);
            }
          }
        });
      }
    }
  };

  export function droppableOrigin(): ng.IDirective {
    return {
      link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
        $(element).droppable({
          drop: function(event, ui) {
            if (ui.draggable.data('dropped-target') == true && ui.draggable.data('dropped-origin') != true) {
              ui.draggable.data('dropped-origin', true);
              ui.draggable.data('dropped-target', false);
            }
          }
        });
      }
    }
  };
}
