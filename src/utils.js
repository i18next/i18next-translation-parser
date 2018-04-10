export function astStats(ast) {
  // console.warn(JSON.stringify(ast, null, 2))
  const stats = {
    interpolation: 0,
    interpolation_unescaped: 0,
    nesting: 0,
    tags: 0
  }

  function process(children) {
    if (!children) return;

    children.forEach(child => {
      if (child.type === 'tag') stats.tags++;
      if (child.type === 'interpolation_unescaped') stats.interpolation_unescaped++;
      if (child.type === 'interpolation') stats.interpolation++;
      if (child.type === 'nesting') stats.nesting++;

      if (child.children) process(child.children);
    });
  }

  process(ast);
  // console.warn(stats);
  return stats;
}
