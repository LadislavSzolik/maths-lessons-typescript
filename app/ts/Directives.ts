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
      link: ($scope: any, element: JQuery, attr: any) => {

        if($scope.object.isDisabled) {
          return
        }

        var hideObject = function() {
          $scope.object.isDropped = false;
          $scope.object.isDisplayed = false;
          $(element).css($scope.object.getInitPlace());
        };

        $rootScope.$on('rubber.remove', (event:any, args:any) =>{
          if(args.objectId == $scope.object.objectId) {
            hideObject();
          }
        })

        $(element).draggable({
          revert: "invalid",
          stop: function(event, ui) {
            $scope.object.setLargePosition($(this).position().top, $(this).position().left);
            $scope.object.setSmallPosition($(this).position().top/3.67, $(this).position().left/3.67);

            if (ui.helper.data('dropped-target') == true && $scope.object.isDropped != true) {
              $scope.object.isDropped = true;
              $(this).animate({
                height: attr.originalHeight
              }, 200);

              $rootScope.$emit('dropped', {
                objectId: $scope.object.objectId,
                parentId: $scope.object.parentId
              });
            }
            else if (ui.helper.data('dropped-origin') == true) {
              ui.helper.data('dropped-target', false);
              ui.helper.data('dropped-origin', false);
              hideObject();
            }
          }
        });

        // On Click event
        $(element).on("click", function() {
          if ($scope.object.isDropped == true) {
            hideObject();
          }
          else {
            $scope.object.isDropped = true;
            $(this).animate({
              height: attr.originalHeight,
              top: $scope.object.largePositionTop,
              left: $scope.object.largePositionLeft
            }, 200);
          }
          $rootScope.$emit('dropped', {
            objectId: $scope.object.objectId,
            parentId: $scope.object.parentId
          });
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
              ui.draggable.data('dropped-origin', true);
              ui.draggable.data('dropped-target', false);
          }
        });
      }
    }
  };

  // draggable directive for exercise 3
  export function draggableBall(): ng.IDirective {
    return {
      link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
        $(element).draggable({
          revert: "invalid",
          start:function(event,ui){
            $(element).css({boxShadow: "0px 3px 4px 1px rgba(0,0,0,0.50)"});
          },
          stop: function(event, ui) {

          }
        });
      }
    }
  };

  // droppable directive for exercise 3
  export function droppableBall($rootScope: any): ng.IDirective {
    return {
      link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
        var isDroppable = true;
        $(element).droppable({
          accept: (draggable:JQuery) => {
            console.log('accept triggered with isDroppable '+ isDroppable);
            return isDroppable;
          },
          out: (event:any, ui:any) => {
            console.log('out triggered');
            isDroppable = true;
          }
          ,
          drop: function(event, ui) {
            isDroppable = false;
            ui.draggable.css({top:$(element).position().top+"px", left:$(element).position().left+"px", boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)"});
            $rootScope.$emit('ball.dropped',{
              dropped: ui.draggable.context.attributes['ball-value'].value,
              destination: attributes.ballValue
            })
          }
        });
      }
    }
  };

  droppableBall.$inject = ['$rootScope'];
}
