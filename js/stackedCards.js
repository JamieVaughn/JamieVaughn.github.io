(function() {
    bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments)
        }
    };
    this.stackedCards = function() {
        stackedCards.prototype.defaults = {
            layout: "slide",
            onClick: undefined,
            transformOrigin: "center"
        };

        function stackedCards(options) {
            if (options == null) {
                options = {}
            }
            this.draw = bind(this.draw, this);
            this.config = this.extend(options, this.defaults)
        }
        stackedCards.prototype.init = function() {
            this.element = window.document.documentElement;
            if ((ref = document.readyState) === "interactive" || ref === "complete") {
                this.draw()
            } else {
                document.addEventListener("DOMContentLoaded", this.draw)
            }
        };
        stackedCards.prototype.getHeight = function() {
            let els = this.nodelistToArray(this.els);
            let elHeights = els.map(item => item.scrollHeight).sort((a, b)=>b-a);
            let maxHeight = elHeights[0];
            return {heights: elHeights, max: maxHeight};
        }
        stackedCards.prototype.draw = function() {
            let me = this;
            let selector = this.config.selector;
            this.els = document.querySelectorAll(selector + " li");
            let els = this.els;
            this.parent = els[0].parentNode;
            let getItemHeight = me.getHeight().max; 
            els.forEach(item => item.style.height = parseInt(getItemHeight) + "px");
            let lenAdjust = els.length % 2 == 0 ? -2 : -1;
            let oneHalf = (els.length + lenAdjust) / 2;
            let activeTransform = "translate(" + -50 + "%, 0%)  scale(1)";
            this.detectSwipe();            
            Array.prototype.forEach.call(els, function(el) {
                el.style.transformOrigin = me.config.transformOrigin;
                el.addEventListener("click", function() {
                    let clickedEl = el;
                    let nextCnt = 0;
                    let prevCnt = 0;
                    do {
                        nextCnt = nextCnt + 1
                    } while (clickedEl = clickedEl.nextElementSibling);
                    clickedEl = el;
                    do {
                        prevCnt = prevCnt + 1
                    } while (clickedEl = clickedEl.previousElementSibling);
                    me.reCalculateTransformsOnClick(nextCnt - 1, prevCnt - 1);
                    me.loopNodeList(els, function(el) {
                        el.classList.remove("active")
                    });
                    el.classList.add("active");
                    el.classList.add(me.config.layout);
                    el.style.zIndex = els.length * 5;
                    el.style.transform = activeTransform;
                    if (me.config.onClick !== undefined) {
                        me.config.onClick(el)
                    }
                })
            });
            
            els[oneHalf].click()
        };
        stackedCards.prototype.reCalculateTransformsOnClick = function(nextCnt, prevCnt) {
            let me = this;
            let z = 10;
            let els = this.nodelistToArray(this.els);
            let maxHeight = parseInt(me.getHeight().max);
            let vertOffsets = me.getHeight().heights.map(item=> Math.round((( 1 - ( item / maxHeight )) * -100) ));
            els[0].parentNode.style.height = String(maxHeight) + "px";
            let scale = 1,
                translateX = 0,
                translateY = 0,
                rotateVal = 0,
                rotate = "";
            let layout = this.config.layout;
            let maxCntDivisor = Math.max(prevCnt, nextCnt);
            let prevDivisor = 100 / maxCntDivisor;
            let nextDivisor = 100 / maxCntDivisor;
            if (prevCnt > nextCnt) {
                scale = 0 + 100 / (prevCnt + 1) / 100
            } else {
                scale = 1 - prevCnt * (1 / (nextCnt + 1))
            }
            let rotatePrevStart = prevCnt * 10 / prevCnt * prevCnt * -1;
            let rotateNextStart = nextCnt * 10 / nextCnt;
            for (let i = 0; i < prevCnt; i++) {
                switch (layout) {
                    case "slide":
                        if (i > 0) {
                            scale = scale + 100 / (maxCntDivisor + 1) / 100
                        }
                        translateX = -50 - prevDivisor * (prevCnt - i);
                        translateY = vertOffsets[i] / 2;
                        rotate = "rotate(0deg)";
                        break;
                    case "fanOut":
                        rotateVal = rotatePrevStart;
                        if (i > 0) {
                            scale = scale + 100 / (maxCntDivisor + 1) / 100
                        }
                        translateX = -50 - prevDivisor * (prevCnt - i);
                        rotate = "rotate(" + rotateVal + "deg)";
                        rotatePrevStart = rotatePrevStart + prevCnt * 10 / prevCnt;
                        break;
                    default:
                        translateX = (150 - prevDivisor * 2 * i) * -1;
                        rotate = "rotate(0deg)"
                }
                let styleStr = "translate(" + translateX + "%, " + translateY + "%)  scale(" + scale + ") " + rotate;
                z = z + 1;
                els[i].style.transform = styleStr;
                els[i].style.zIndex = z
            }
            z = z - 1;
            let j = 0;
            rotateNegStart = 0;
            scale = 1;
            for (let i = prevCnt + 1; i < nextCnt + prevCnt + 1; i++) {
                j = j + 1;
                switch (layout) {
                    case "slide":
                        scale = scale - 100 / (maxCntDivisor + 1) / 100;
                        translateX = (50 - nextDivisor * j) * -1;
                        translateY = vertOffsets[i] / 2;
                        rotate = "rotate(0deg)";
                        break;
                    case "fanOut":
                        rotateVal = rotateNextStart;
                        scale = scale - 100 / (maxCntDivisor + 1) / 100;
                        translateX = (50 - nextDivisor * j) * -1;
                        rotate = "rotate(" + rotateVal + "deg)";
                        rotateNextStart = rotateNextStart + nextCnt * 10 / nextCnt;
                        break;
                    default:
                        translateX = (50 - prevDivisor * 2 * i) * -1;
                        rotate = "rotate(0deg)"
                }
                z = z - 1;
                let styleStr = "translate(" + translateX + "%, "+ translateY + "%)  scale(" + scale + ") " + rotate;
                els[i].style.transform = styleStr;
                els[i].style.zIndex = z
            }
        };
        stackedCards.prototype.detectSwipe = function() {
            let me = this;
            let regionEl = document.querySelector(me.config.selector);
            me.detectSwipeDir(regionEl, function(swipedir) {
                let activeEl = document.querySelector(me.config.selector + " li.active");
                if (swipedir == "left") {
                    activeEl.nextElementSibling.click()
                } else if (swipedir == "right") {
                    activeEl.previousElementSibling.click()
                }
            })
        };
        stackedCards.prototype.extend = function(custom, defaults) {
            let key, value;
            for (key in defaults) {
                value = defaults[key];
                if (custom[key] == null) {
                    custom[key] = value
                }
            }
            return custom
        };
        stackedCards.prototype.nodelistToArray = function(nodelist) {
            let results = [];
            let i, element;
            for (i = 0; i < nodelist.length; i++) {
                element = nodelist[i];
                results.push(element)
            }
            return results
        };
        stackedCards.prototype.loopNodeList = function(els, callback, scope) {
            for (let el of els) {
                callback.call(scope, el)
            }
        };
        stackedCards.prototype.scrolledIn = function(el) {
            if (typeof el == "undefined") return;
            let elemTop = el.getBoundingClientRect().top;
            let scrolledInEl = elemTop >= 0 && elemTop <= window.innerHeight;
            return scrolledInEl
        };
        stackedCards.prototype.detectSwipeDir = function(el, callback) {
            let touchsurface = el,
                swipedir, startX, startY, distX, distY, threshold = 75,
                restraint = 100,
                allowedTime = 300,
                elapsedTime, startTime, handleswipe = callback || function(swipedir) {};
            touchsurface.addEventListener("touchstart", function(e) {
                let touchobj = e.changedTouches[0];
                let swipedir = "none";
                let dist = 0;
                let startX = touchobj.pageX;
                let startY = touchobj.pageY;
                let startTime = (new Date).getTime();
            }, false);
            touchsurface.addEventListener("touchmove", function(e) {}, false);
            touchsurface.addEventListener("touchend", function(e) {
                let touchobj = e.changedTouches[0];
                distX = touchobj.pageX - startX;
                distY = touchobj.pageY - startY;
                elapsedTime = (new Date).getTime() - startTime;
                if (elapsedTime <= allowedTime) {
                    if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                        swipedir = distX < 0 ? "left" : "right"
                    } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                        swipedir = distY < 0 ? "up" : "down"
                    }
                }
                handleswipe(swipedir);
                // e.preventDefault()
            }, false)
        };
        return stackedCards
    }()
}).call(this);