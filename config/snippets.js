'use strict';

var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var glob = require('glob');
var cheerio = require('cheerio');
var _ = require('underscore');
var config = require('./config');

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function rememberTag(res, fileName, tag) {
    if (tag === undefined) {
        return;
    }

    tag = tag.trim();
    if (tag.length === 0) {
        return;
    }
    if (res[fileName] === undefined) {
        res[fileName] = { };
    }

    if (res[fileName][tag] === undefined) {
        res[fileName][tag] = { count : 0 };
    }

    res[fileName][tag].count++;
}

module.exports = {
    findBySnippetId : function(snippetId, res) {
        var keys = _.keys(res);

        var ii = _.findIndex(keys, function(str) {
            var eq = str.indexOf(snippetId);
            return eq !== -1;
        });

        var controllerJs = keys[ii].replace('views/', 'controllers/');
        controllerJs = controllerJs.replace('.html', '.js');
        var result = {
            templateHtml : keys[ii],
            controllerJs : controllerJs,
            sources : ['bla', 'bla1']
        }
        return result;
    },

    readMetatags : function(files, res, cwd) {
       lodash.forEach(files , function(fileName) {
            console.log(fileName);
            var str = fs.readFileSync(cwd+fileName, 'utf8');
            var $ = cheerio.load(str);

           // should be one
           var myText = $('div.snippet').each(function( index ) {
               var tags = $( this).attr('categories');
                if (tags === undefined) {
                    //return;
                }

               tags = tags.split(',');


               _.each(tags, function(tag) {
                   rememberTag(res, fileName, tag)
               });

           });

        });
        //console.log(res);
    }

}