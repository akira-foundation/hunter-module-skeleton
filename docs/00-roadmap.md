# Roadmap

This document outlines planned features and improvements for hunter-module-skeleton.

## Current Version (1.x)

The skeleton provides a complete foundation for building Hunter modules:

- Hunter CLI with code generation commands
- Module service provider with navigation support
- React 19 + Inertia 2 frontend scaffolding
- Pest 4 testing setup with Orchestra Testbench
- Development environment with embedded Laravel app

## Planned Features

### Short Term

- [ ] **Interactive prompts** - Add interactive mode to `hunter make:*` commands for guided code generation
- [ ] **Module dependencies** - Support declaring dependencies on other Hunter modules
- [ ] **Asset publishing** - Commands for publishing module assets to the host application

### Medium Term

- [ ] **API scaffolding** - Generate API controllers and resources with `hunter make:api`
- [ ] **Event scaffolding** - Generate events and listeners with `hunter make:event`
- [ ] **Policy scaffolding** - Generate policies with `hunter make:policy`
- [ ] **Job scaffolding** - Generate queueable jobs with `hunter make:job`

### Long Term

- [ ] **Module marketplace** - Integration with a central module registry
- [ ] **Version compatibility** - Automated compatibility checks with Hunter core versions
- [ ] **Module templates** - Pre-built module templates (CRUD, API-only, admin panel)

## Contributing

Ideas and contributions are welcome. See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

---

**Next:** [Installation](01-installation.md)
