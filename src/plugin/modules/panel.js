
define([
    'kb_common/html',
    'kb_common/bootstrapUtils',
    './lib/utils',
    'dagre'
], function (
    html, 
    BS,
    Utils,
    Dagre
) {
    'use strict';

    var t = html.tag,
        h2 = t('h1'),
        p = t('p'),
        a = t('a'),
        div = t('div'),
        ul = t('ul'),
        li = t('li');

    function factory(config) {
        var hostNode, container,
            runtime = config.runtime;

        function buildDagreDemo() {
            var g = new Dagre.graphlib.Graph();

            // Set an object for the graph label
            g.setGraph({});

            // Default to assigning a new object as a label for each new edge.
            g.setDefaultEdgeLabel(function() { return {}; });

            // Add nodes to the graph. The first argument is the node id. The second is
            // metadata about the node. In this case we're going to add labels to each of
            // our nodes.
            g.setNode('kspacey',    { label: 'Kevin Spacey',  width: 144, height: 100 });
            g.setNode('swilliams',  { label: 'Saul Williams', width: 160, height: 100 });
            g.setNode('bpitt',      { label: 'Brad Pitt',     width: 108, height: 100 });
            g.setNode('hford',      { label: 'Harrison Ford', width: 168, height: 100 });
            g.setNode('lwilson',    { label: 'Luke Wilson',   width: 144, height: 100 });
            g.setNode('kbacon',     { label: 'Kevin Bacon',   width: 121, height: 100 });

            // Add edges to the graph.
            g.setEdge('kspacey',   'swilliams');
            g.setEdge('swilliams', 'kbacon');
            g.setEdge('bpitt',     'kbacon');
            g.setEdge('hford',     'lwilson');
            g.setEdge('lwilson',   'kbacon');

            return div([
                g.nodes().map(function(v) {
                    return div([
                        'Node ',
                        v,
                        ': ',
                        JSON.stringify(g.node(v))
                    ]);
                }),
                g.edges().map(function(e) {
                    return div([
                        'Edge ',
                        e.v,
                        '-> ',
                        e.w + 
                        ': ',
                        JSON.stringify(g.node(e))
                    ]);
                }),
            ]);

        }

        function layout() {
            return div({
                class: 'plugin_dagre-example_panel container-fluid'
            }, [
                div({
                    class: 'row'
                }, [
                    div({class: 'col-sm-6'}, [
                        h2('Dagre Example'),
                        buildDagreDemo()
                        
                    ]),
                    div({class: 'col-sm-6'}, [
                        BS.buildPanel({
                            title: 'Dagre Demo',
                            body: div([
                                p('This plugin exists to demonstrate usage of dagre.'),
                                ul([
                                    li(a({
                                        href: 'https://github.com/dagrejs/dagre',
                                        target: '_blank'
                                    }, 'dagre @ github'))

                                ])
                            ])
                        })
                    ])
                ])
            ]);
        }

        function init(config) {
            return null;
        }

        function attach(node) {
            hostNode = node;
            container = hostNode.appendChild(document.createElement('div'));

            return null;
        }

        function start(params) {
            container.innerHTML = layout();
            runtime.send('ui', 'setTitle', 'Dagre Example');
        }

        function run(params) {
            
        }

        function stop() {
            
        }
        function detach() {
            if (hostNode && container) {
                hostNode.removeChild(container);
            }
        }
        function destroy() {
            
        }

        return Object.freeze({
            init: init,
            attach: attach,
            start: start,
            run: run,
            stop: stop,
            detach: detach,
            destroy: destroy
        });
    }

    return {
        make: factory
    };
});