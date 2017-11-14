import { CourseModel } from "../models/course-model";
import { CourseService } from "../services/course-service";
import { autoinject } from "aurelia-dependency-injection";
import { ReviewModel } from "../../reviews/models/review-model";
import { BindingSignaler } from 'aurelia-templating-resources';
import * as $ from 'jquery';
import { NewReviewModel } from "../../reviews/models/new-review-model";
import { IdentityService } from "../../core/identity-service";
import { ReviewService } from "../../reviews/services/review-service";
import { Toastr } from "../../core/taostr";

@autoinject()
export class CourseDetails {

    model: CourseModel;
    newReview: NewReviewModel;

    constructor(private courseService: CourseService, private identityService: IdentityService, private reviewService: ReviewService, private toastr: Toastr) { }

    async activate(params: any) {
        this.model = await this.courseService.getDetails(params.id);
        this.newReview = new NewReviewModel();
    }
    updateNewReviewRating() {
        this.newReview.rating = parseInt($('input#ratings-hidden').val());
    }
    async postReview() {
        if (!this.checkIfUserIsStillLogged())
            return;
        this.updateNewReviewRating();
        if (this.newReview.content == null || this.newReview.content.length < 20) {
            this.toastr.warning("Najpierw uzupełnij swoją opinie (min. 20 znaków)");
            return;
        }
        if (isNaN(this.newReview.rating)) {
            this.toastr.warning('Najpierw zaznacz ocene.');
            return;
        }
        await this.reviewService.postReview(this.model.id, this.newReview);
        window.location.reload(true);

    }
    async approveReview(id: string, index: number) {
        try {
            if (!this.checkIfUserIsStillLogged())
                return;
            let priorMark: number = await this.reviewService.getUserOpinionToReview(id);
            if (priorMark == 1) {
                await this.reviewService.removeApprove(id);
                this.model.reviews[index].points -= 1;
                this.updateOpinionClass(id);
                return;
            }
            await this.reviewService.approveReview(id);
            this.model.reviews[index].points += 1;
            if (priorMark == -1)
                this.model.reviews[index].points += 1;
            this.updateOpinionClass(id);
        }
        catch (err) {
            this.toastr.warning("Nie możesz plusować swojej recenzji.");
        }

    }
    async disapproveReview(id: string, index: number) {
        try {
            if (!this.checkIfUserIsStillLogged())
                return;
            let priorMark: number = await this.reviewService.getUserOpinionToReview(id);
            if (priorMark == -1) {
                await this.reviewService.deleteDisapprove(id);
                this.model.reviews[index].points += 1;
                this.updateOpinionClass(id);
                return;
            }
            await this.reviewService.disapproveReview(id);
            this.model.reviews[index].points -= 1;
            if (priorMark == 1)
                this.model.reviews[index].points -= 1;
            this.updateOpinionClass(id);
        }
        catch (err) {
            this.toastr.warning("Nie możesz minusować swojej recenzji.");
        }
    }
    checkIfUserIsStillLogged(): boolean {
        if (!this.identityService.isUserLogged()) {
            this.toastr.warning("Twoja sesja wygasla. Zaloguj się ponownie.");
            return false;
        }
        return true;
    }
    async showRemoveButtonIfUserIsAuthor(review: ReviewModel) {
        let currentUser = await this.identityService.getIdentityModel();
        if (currentUser != null && review.user.id == currentUser.id) {
            let d = document.getElementById(`remove-review-${review.id}`);
            d.style.visibility = "visible";
        }


    }
    async updateOpinionClass(reviewId: string) {
        let userMark: number = await this.reviewService.getUserOpinionToReview(reviewId);
        let d = document.getElementById(`opinion-${reviewId}`);
        if (userMark == 1)
            d.className = "opinion opinion-approved";
        else if (userMark == -1)
            d.className = "opinion opinion-disapproved";
        else
            d.className = "opinion";
    }
    async deleteReview(reviewId: string)
    {
        await this.reviewService.deleteReview(reviewId);
        window.location.reload(true);
    }



    async attached() {
        //thanks for msurguy, https://bootsnipp.com/snippets/featured/expanding-review-and-rating-box
        (function (e) { var t, o = { className: "autosizejs", append: "", callback: !1, resizeDelay: 10 }, i = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>', n = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"], s = e(i).data("autosize", !0)[0]; s.style.lineHeight = "99px", "99px" === e(s).css("lineHeight") && n.push("lineHeight"), s.style.lineHeight = "", e.fn.autosize = function (i) { return this.length ? (i = e.extend({}, o, i || {}), s.parentNode !== document.body && e(document.body).append(s), this.each(function () { function o() { var t, o; "getComputedStyle" in window ? (t = window.getComputedStyle(u, null), o = u.getBoundingClientRect().width, e.each(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], function (e, i) { o -= parseInt(t[i], 10) }), s.style.width = o + "px") : s.style.width = Math.max(p.width(), 0) + "px" } function a() { var a = {}; if (t = u, s.className = i.className, d = parseInt(p.css("maxHeight"), 10), e.each(n, function (e, t) { a[t] = p.css(t) }), e(s).css(a), o(), (<any>window).chrome) { var r = u.style.width; u.style.width = "0px", u.offsetWidth, u.style.width = r } } function r() { var e, n; t !== u ? a() : o(), s.value = u.value + i.append, s.style.overflowY = u.style.overflowY, n = parseInt(u.style.height, 10), s.scrollTop = 0, s.scrollTop = 9e4, e = s.scrollTop, d && e > d ? (u.style.overflowY = "scroll", e = d) : (u.style.overflowY = "hidden", c > e && (e = c)), e += w, n !== e && (u.style.height = e + "px", f && i.callback.call(u, u)) } function l() { clearTimeout(h), h = setTimeout(function () { var e = p.width(); e !== g && (g = e, r()) }, parseInt(i.resizeDelay, 10)) } var d, c, h, u = this, p = e(u), w = 0, f = e.isFunction(i.callback), z = { height: u.style.height, overflow: u.style.overflow, overflowY: u.style.overflowY, wordWrap: u.style.wordWrap, resize: u.style.resize }, g = p.width(); p.data("autosize") || (p.data("autosize", !0), ("border-box" === p.css("box-sizing") || "border-box" === p.css("-moz-box-sizing") || "border-box" === p.css("-webkit-box-sizing")) && (w = p.outerHeight() - p.height()), c = Math.max(parseInt(p.css("minHeight"), 10) - w || 0, p.height()), p.css({ overflow: "hidden", overflowY: "hidden", wordWrap: "break-word", resize: "none" === p.css("resize") || "vertical" === p.css("resize") ? "none" : "horizontal" }), "onpropertychange" in u ? "oninput" in u ? p.on("input.autosize keyup.autosize", r) : p.on("propertychange.autosize", function () { "value" === (<any>event).propertyName && r() }) : p.on("input.autosize", r), i.resizeDelay !== !1 && e(window).on("resize.autosize", l), p.on("autosize.resize", r), p.on("autosize.resizeIncludeStyle", function () { t = null, r() }), p.on("autosize.destroy", function () { t = null, clearTimeout(h), e(window).off("resize", l), p.off("autosize").off(".autosize").css(z).removeData("autosize") }), r()) })) : this } })((<any>window).jQuery || (<any>window).$);
        var __slice = [].slice; (function (e, t) { var n; n = function () { function t(t, n) { var firstSync = false; var r, i, s, o = this; this.options = e.extend({}, this.defaults, n); this.$el = t; s = this.defaults; for (r in s) { i = s[r]; if (this.$el.data(r) != null) { this.options[r] = this.$el.data(r) } } this.createStars(); this.syncRating(); this.$el.on("mouseover.starrr", "span", function (e) { return o.syncRating(o.$el.find("span").index(e.currentTarget) + 1) }); this.$el.on("mouseout.starrr", function () { return o.syncRating() }); this.$el.on("click.starrr", "span", function (e) { return o.setRating(o.$el.find("span").index(e.currentTarget) + 1) }); this.$el.on("starrr:change", this.options.change) } t.prototype.defaults = { rating: void 0, numStars: 5, change: function (e, t) { } }; t.prototype.createStars = function () { var e, t, n; n = []; for (e = 1, t = this.options.numStars; 1 <= t ? e <= t : e >= t; 1 <= t ? e++ : e--) { n.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>")) } return n }; t.prototype.setRating = function (e) { if (e != null && this.$el.hasClass('static-starrr')) return t; if (this.options.rating === e) { e = void 0 } this.options.rating = e; this.syncRating(); return this.$el.trigger("starrr:change", e) }; t.prototype.syncRating = function (e) { if (e != null && this.$el.hasClass('static-starrr')) return t; var t, n, r, i; e || (e = this.options.rating); if (e) { for (t = n = 0, i = e - 1; 0 <= i ? n <= i : n >= i; t = 0 <= i ? ++n : --n) { this.$el.find("span").eq(t).removeClass("glyphicon-star-empty").addClass("glyphicon-star") } } if (e && e < 5) { for (t = r = e; e <= 4 ? r <= 4 : r >= 4; t = e <= 4 ? ++r : --r) { this.$el.find("span").eq(t).removeClass("glyphicon-star").addClass("glyphicon-star-empty") } } if (!e) { return this.$el.find("span").removeClass("glyphicon-star").addClass("glyphicon-star-empty") } }; return t }(); return e.fn.extend({ starrr: function () { var t, r; r = arguments[0], t = 2 <= arguments.length ? __slice.call(arguments, 1) : []; return this.each(function () { var i; i = e(this).data("star-rating"); if (!i) { e(this).data("star-rating", i = new n(e(this), r)) } if (typeof r === "string") { return i[r].apply(i, t) } }) } }) })((<any>window).jQuery, window); $(function () { return $(".starrr").starrr() })
        $(function () {

            $('#new-review').autosize({
                append: "\n"
            });

            var reviewBox = $('#post-review-box');
            var newReview = $('#new-review');
            var openReviewBtn = $('#open-review-box');
            var closeReviewBtn = $('#close-review-box');
            var ratingsField = $('#ratings-hidden');

            openReviewBtn.click(function (e) {
                reviewBox.slideDown(400, function () {
                    $('#new-review').trigger('autosize.resize');
                    newReview.focus();
                });
                openReviewBtn.fadeOut(100);
                closeReviewBtn.show();
            });

            closeReviewBtn.click(function (e) {
                e.preventDefault();
                reviewBox.slideUp(300, function () {
                    newReview.focus();
                    openReviewBtn.fadeIn(200);
                });
                closeReviewBtn.hide();

            });

            $('.starrr').on('starrr:change', function (e, value) {
                ratingsField.val(value);
            });
        });

        if(this.identityService.isUserLogged())
        {
            for (let i = 0; i < this.model.reviews.length; ++i) {
                this.updateOpinionClass(this.model.reviews[i].id);
                this.showRemoveButtonIfUserIsAuthor(this.model.reviews[i]);
            }
        }
    }

}