SRC_DIR := src
OUT_DIR := out
SOURCES := $(wildcard $(SRC_DIR)/*.md)
OUTPUTS := $(patsubst $(SRC_DIR)/%.md,$(OUT_DIR)/%.html,$(SOURCES))

.PHONY: all check build test clean ci deps package

all: test

node_modules: package-lock.json
	npm ci
	@touch node_modules

deps: node_modules

$(OUT_DIR):
	mkdir -p $(OUT_DIR)

$(OUT_DIR)/%.html: $(SRC_DIR)/%.md package-lock.json | $(OUT_DIR) node_modules
	@echo "  BUILD $< -> $@"
	@npm run --silent build -- $< $@

check:
	@if [ ! -d $(SRC_DIR) ] || [ -z "$(SOURCES)" ]; then \
		echo "ERROR: no .md files found in $(SRC_DIR)"; exit 1; \
	fi
	@echo "found $(words $(SOURCES)) source file(s) in $(SRC_DIR)"

build: $(OUTPUTS)

test: build
	@npm test --silent

package: test
	npm pack

clean:
	rm -rf $(OUT_DIR) *.tgz

ci: clean deps check test package
